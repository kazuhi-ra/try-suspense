import { Suspense } from 'react'

const sleep = (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000))

type GreetType = 'yo' | 'hai' | 'hey'

let cache: null | GreetType = null
const lazyGreet = (greet: GreetType) => {
  console.log(2, 6, 'lazyGreetが呼ばれました')
  if (cache) {
    console.log(7, 'cacheを返します')
    return cache
  }

  const promise = sleep(1).then(() => {
    console.log(4, 'promiseです。cacheします')
    cache = greet
  })

  console.log(3, 'throwします')
  throw promise
}

const Greet: React.VFC<{ greet: GreetType }> = ({ greet }) => {
  console.log(1, 5, 'Greet()')
  const yourGreet = lazyGreet(greet)
  console.log('yourGreet', yourGreet)

  return <div>{yourGreet}, KAZUHIRA!</div>
}

const App = () => {
  console.log(0, 'App()')
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Greet greet='hai' />
    </Suspense>
  )
}

export default App
