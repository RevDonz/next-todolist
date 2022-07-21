import {
  Aside,
  Text,
  MediaQuery,
  Menu,
  Divider,
  ActionIcon,
  Group,
  SegmentedControl,
  Center,
  Box,
  useMantineColorScheme,
  Tooltip,
} from '@mantine/core'

import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Trash,
  ArrowsLeftRight,
  DotsVertical,
  Sun,
  Moon,
} from 'tabler-icons-react'

const RightSide = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <Aside
        p="md"
        hiddenBreakpoint="sm"
        width={{ sm: 100, lg: 200 }}
        sx={(theme) => ({
          borderStyle: 'none',
          background: colorScheme === 'light' ? theme.colors.gray[2] : '',
        })}
      >
        <Group position="right">
          <Menu
            placement="end"
            size={'lg'}
            control={
              <Tooltip
                label="Settings"
                position="left"
                placement="center"
                withArrow
              >
                <ActionIcon variant="light" size={'lg'}>
                  <DotsVertical />
                </ActionIcon>
              </Tooltip>
            }
          >
            <Menu.Label>Theme</Menu.Label>
            <SegmentedControl
              fullWidth
              mx="sm"
              value={colorScheme}
              onChange={() => toggleColorScheme()}
              data={[
                {
                  label: (
                    <Center>
                      <Sun size={16} />
                      <Box ml={10}>Light</Box>
                    </Center>
                  ),
                  value: 'light',
                },
                {
                  label: (
                    <Center>
                      <Moon size={16} />
                      <Box ml={10}>Dark</Box>
                    </Center>
                  ),
                  value: 'dark',
                },
              ]}
            />
            <Divider />
            <Menu.Label>Application</Menu.Label>
            <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
            <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
            <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
            <Menu.Item
              icon={<Search size={14} />}
              rightSection={
                <Text size="xs" color="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<ArrowsLeftRight size={14} />}>
              Transfer my data
            </Menu.Item>
            <Menu.Item color="red" icon={<Trash size={14} />}>
              Delete my account
            </Menu.Item>
          </Menu>
        </Group>
      </Aside>
    </MediaQuery>
  )
}

export default RightSide
