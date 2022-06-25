import { AccountProvider } from './context/AccountContext'
import { StakingProvider } from './context/StakingContext'
import { SubstrateContextProvider as SubstrateProvider } from './context/SubstrateContext'
import { ValidatorProvider } from './context/ValidatorContext'
import { TokenProvider } from './context/TokenContext'
import { BalanceProvider } from './context/BalanceContext'

export default function Provider({children}) {
  return (
    <SubstrateProvider>
      <BalanceProvider>
        <StakingProvider>
          <ValidatorProvider>
              <AccountProvider>
                <TokenProvider>
                  {children}
                </TokenProvider>
              </AccountProvider>
          </ValidatorProvider>
        </StakingProvider>
      </BalanceProvider>
    </SubstrateProvider>
  )
}
