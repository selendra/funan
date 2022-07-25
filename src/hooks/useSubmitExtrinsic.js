import { message } from 'antd';
import { useState, useEffect } from 'react';
import { useSubstrateState } from '../context/SubstrateContext';

export const useSubmitExtrinsic = (extrinsic) => {
  const { 
    tx, 
    from,
    password, 
    shouldSubmit, 
    callbackSubmit, 
    callbackInBlock 
  } = extrinsic;

  const { api, keyring } = useSubstrateState();
  // whether the transaction is in progress
  const [submitting, setSubmitting] = useState(false);
  // get the estimated fee for submitting the transaction
  const [estimatedFee, setEstimatedFee] = useState(null);

  // calculate fee upon setup changes and initial render
  useEffect(() => {
    const calculateEstimatedFee = async () => {
      if (!tx || !from) return;
      // get payment info
      const info = await tx.paymentInfo(from);
      // convert fee to unit
      setEstimatedFee(info.partialFee.toJSON());
    };
    calculateEstimatedFee();
  }, [from, extrinsic, tx]);

  // submit extrinsic
  const submitTx = async () => {
    if (submitting || !shouldSubmit || !api || !from) return;
    // const accountNonce = await api.rpc.system.accountNextIndex(from);
    setSubmitting(true);

    try {
      // decrypt pair
      const _account = keyring.getPair(from);
      _account.decodePkcs8(password);
      const unsub = await tx.signAndSend(
        _account,
        ({ status, nonce, events = [] }) => {
          if(status.isReady) {
            message.loading('Transaction was initiated.')
            callbackSubmit();
          }
          if(status.isInBlock) {
            setSubmitting(false);
            message.info('Transaction in block');
            callbackInBlock();
          }
          if(status.isFinalized) {
            events.forEach(
              ({ phase, event: { data, method, section } }) => {
                if (method === 'ExtrinsicSuccess') {
                  message.success('Transaction successful')
                  unsub();
                } else if (method === 'ExtrinsicFailed') {
                  // console.log(data)
                  message.error('Error with transaction');
                  setSubmitting(false);
                  unsub();
                }
              }
            );
          }
        }
      );
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      message.error('Transaction was cancelled');
    }
  };

  return {
    submitTx,
    estimatedFee,
    submitting,
  };
};
