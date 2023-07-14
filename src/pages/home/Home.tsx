/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FormEvent, useEffect, useState } from 'react'
import styles from './Home.module.css'
import { BiSearch } from 'react-icons/bi'
import { NavLink, useNavigate } from 'react-router-dom'

//https://coinlib.io/api/v1/coinlist?key=68f8ec7838d7ec26

interface CoinsProps {
  name: string
  delta_24h: string
  price: string
  symbol: string
  volume_24h: string
  market_cap: string
  formatedPrice: string
  formatedMarket: string
  fomatedVolume: string
  formatedDelta?: number
}

interface DataProps {
  coins: CoinsProps[]
}


const Home = () => {
  const [coins, setCoins] = useState<CoinsProps[]>([]);
  const [searchedCoin, setSearchedCoin] = useState('');
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch('https://sujeitoprogramador.com/api-cripto/?key=68f8ec7838d7ec26&pref=BRL')
        const response: DataProps = await data.json();
        const coinsData = response.coins.slice(0, 15);//Como a resposta são 100 moedas, o slice foi usado para pegar apenas do 0 ao 15.

        const price = Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        //Agora precisamos Formatar a moeda para vir em formado de dinheiro, para isso vamos percorrer todo nosso array de coins e fazer a formatação.
        const formatCoins = coinsData.map((coin) => {
          const formated = {
            ...coin,
            formatedPrice: price.format(Number(coin.price)),
            formatedMarket: price.format(Number(coin.market_cap)),
            fomatedVolume: price.format(parseFloat(coin.volume_24h)),
            formatedDelta: parseFloat(coin.delta_24h.replace(',', '.'))
          }
          return formated;
        })

        console.log(formatCoins)
        setCoins(formatCoins);
        setLoading(false)
      } catch (erro) {
        console.log(erro)
      }
    }
    void getData()
  }, [])

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>

        </div>
      </div>
    )
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    if (searchedCoin === '') return;

    navigate(`/details/${searchedCoin}`)
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          value={searchedCoin}
          placeholder='Digite a criptomoeda desejada'
          onChange={(e) => setSearchedCoin(e.target.value)}
        />
        <button type='submit' >
          <BiSearch size={25} color="#FFF" />
        </button>
      </form>

      <table>
        {/* thead é o cabeçalho da tabela */}
        <thead>
          <tr>
            <th scope='col'>Moeda</th>
            <th scope='col'>Valor mercado</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>
        {/* tbody é o corpo da tabela, nesse caso as colunas serão os td */}
        <tbody id='tbody'>
          {coins.map((coin) => (
            <tr key={coin.name} className={styles.tr}>
              <td className={styles.tdlabel} data-label='Moeda'>
                <NavLink className={styles.link} to={`/details/${coin.symbol}`}   >
                  <span>{coin.name} - {coin.symbol}</span>
                </NavLink>
              </td>
              <td className={styles.tdlabel} data-label='Mercado'>
                {coin.formatedMarket}
              </td>
              <td className={styles.tdlabel} data-label='Preço'>
                {coin.formatedPrice}
              </td>
              <td className={Number(coin?.formatedDelta) > 0 ? styles.tdProfit : styles.tdLoss} data-label='Volume'>
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </main >
  )
}

export default Home