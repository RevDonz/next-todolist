import { AppProps } from 'next/app'
import Head from 'next/head'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'))
  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            fontFamily: 'Poppins, sans-serif',
            colorScheme: colorScheme,
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
