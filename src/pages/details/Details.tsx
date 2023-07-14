/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from './Details.module.css'

interface CoinDetailProps {
  symbol: string
  name: string
  price: string
  market_cap: string
  low_24h: string
  high_24h: string
  total_volume_24: string
  delta_24h: string
  formatedPrice: string
  formatedMarket: string
  formatedLowPrice: string
  formatedHighPrice: string
  formatedDelta: number
  error?: string
}
const Details = () => {
  const { cripto } = useParams();
  const [coinDetail, setCoinDetail] = useState<CoinDetailProps>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchCoin() {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const data: Response = await fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=68f8ec7838d7ec26&pref=BRL&symbol=${cripto}`);
      const coin: CoinDetailProps = await data.json();
      const price = Intl.NumberFormat("BRL", {
        style: 'currency',
        currency: 'BRL'
      })

      console.log(coin);

      const resultFormated = {
        ...coin,
        formatedPrice: price.format(Number(coin.price)),
        formatedMarket: price.format(Number(coin.market_cap)),
        formatedLowPrice: price.format(Number(coin.low_24h)),
        formatedHighPrice: price.format(Number(coin.high_24h)),
        formatedDelta: parseFloat(coin.delta_24h.replace(',', '.'))
      }
      setCoinDetail(resultFormated);
      setLoading(false);
    }
    void fetchCoin()
  }, [cripto])


  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>

        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2> {coinDetail?.name}</h2>

      <div className={styles.detailsContainer}>
        <p><span>Preço:</span> {coinDetail?.formatedPrice}</p>
        <p><span>Maior Preço:</span> {coinDetail?.formatedHighPrice}</p>
        <p><span>Menor Preço:</span>{coinDetail?.formatedLowPrice} </p>
        <p><span>Delta(últimas 24h):</span> <span className={Number(coinDetail?.formatedDelta) >= 0 ? styles.profit : styles.loss} >{coinDetail?.formatedDelta}</span> </p>
      </div>

    </div>
  )
}

export default Details