import { useState } from "react";

export function useAddSELToken() {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null
  })

  async function handleAddSELToken() {
    try {
      setState({
        loading: true,
        data: null,
        error: null
      })
      // will be update to dynamic in the future if needed!
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: '0x30bAb6B88dB781129c6a4e9B7926738e3314Cf1C', // The address that the token is at.
            symbol: 'SEL', // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            image: 'https://user-images.githubusercontent.com/38589050/149439179-f287a574-b153-45e6-a96c-1a3c9adc36d0.png' // A string url of the token logo
          }
        }
      });
      console.log(wasAdded)
      if(wasAdded) {
        setState({
          loading: false,
          data: wasAdded,
          error: null
        })
      }
    } catch (error) {
      console.log(error)
      setState({
        loading: false,
        data: null,
        error: error
      })
    }
  }

  return [state, handleAddSELToken];
}