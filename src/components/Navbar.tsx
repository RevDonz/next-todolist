import { Navbar, Paper, useMantineColorScheme } from '@mantine/core'

const SideNavbar = () => {
  const { colorScheme } = useMantineColorScheme()

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={true}
      width={{ sm: 500 }}
      sx={(theme) => ({
        borderStyle: 'none',
        background: colorScheme === 'light' ? theme.colors.gray[2] : '',
      })}
    >
      <Paper
        shadow={'xs'}
        p={'md'}
        radius={'md'}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.dark[0],
        })}
      ></Paper>
    </Navbar>
  )
}

export default SideNavbar
