import { useEffect, useState } from "react";
import { useIsMountedRef } from "./useIsMountedRef";

const EMPTY_STATE = {
  isLoadingRewards: true,
  rewardCount: 0
};

const EMPTY_FILTERED = {
  filteredEras: [],
  validatorEras: []
};

function getRewards ([[stashIds], available]) {
  const allRewards = {};

  stashIds.forEach((stashId, index) => {
    allRewards[stashId] = available[index].filter(({ eraReward }) => !eraReward.isZero());
  });

  return {
    allRewards,
    isLoadingRewards: false,
    rewardCount: Object.values(allRewards).filter((rewards) => rewards.length !== 0).length
  };
}

function useOwnEraRewardsImpl(maxEras, ownValidators, additional, api) {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState(EMPTY_STATE);
  const [{ filteredEras, validatorEras }, setFiltered] = useState(EMPTY_FILTERED);
  const [allEras, setAllEras] = useState(null);
  const [stakerRewards, setStakerRewards] = useState(null);

  useEffect(() => {
    async function Query() {
      const _allEras = await api.derive.staking?.erasHistoric();
      const _stakerRewards = await api.derive.staking?.stakerRewardsMultiEras(stashIds, filteredEras);
      setAllEras(_allEras);
      setStakerRewards(_stakerRewards);
    }
    Query();
  },[api, filteredEras]);

  useEffect(() => {
    setState({ allRewards: null, isLoadingRewards: true, rewardCount: 0 });
  }, [maxEras, ownValidators]);

  useEffect(() => {
    if (allEras && maxEras) {
      const filteredEras = allEras.slice(-1 * maxEras);
      const validatorEras = [];

      if (allEras.length === 0) {
        setState({
          allRewards: {},
          isLoadingRewards: false,
          rewardCount: 0
        });
        setFiltered({ filteredEras, validatorEras });
      } else if (ownValidators?.length) {
        ownValidators.forEach(({ stakingLedger, stashId }) => {
          if (stakingLedger) {
            const eras = filteredEras.filter((era) => !stakingLedger.claimedRewards.some((c) => era.eq(c)));

            if (eras.length) {
              validatorEras.push({ eras, stashId });
            }
          }
        });

        // When we have just claimed, we have filtered eras, but no validator eras - set accordingly
        if (filteredEras.length && !validatorEras.length) {
          setState({
            allRewards: {},
            isLoadingRewards: false,
            rewardCount: 0
          });
        }
      }

      setFiltered({ filteredEras, validatorEras });
    }
  }, [allEras, maxEras, ownValidators]);

  useEffect(() => {
    mountedRef.current && stakerRewards && !ownValidators && setState(
      getRewards(stakerRewards)
    );
  }, [mountedRef, ownValidators, stakerRewards]);
}