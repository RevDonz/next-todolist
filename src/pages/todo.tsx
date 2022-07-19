import React, { useState } from 'react'
import {
  AppShell,
  Navbar,
  TextInput,
  Checkbox,
  Paper,
  Grid,
  Center,
  Title,
  Text,
} from '@mantine/core'

import { DatePicker } from '@mantine/dates'

import RightSide from '@/components/Aside'
import { useForm } from '@mantine/form'
import { randomId, useLocalStorage } from '@mantine/hooks'
import { getCurrentDate, getCurrentDay, getCurrentMonth, getTimeOfDay } from '@/utils/getTimes'

interface todo {
  checked: boolean
  content: string
  key: string
}

export default function Todo() {
  const [opened, setOpened] = useState(false)
  const [value, setValue] = useLocalStorage<todo[]>({
    key: 'listTodo',
  })

  const form = useForm({
    initialValues: {
      checked: false,
      content: '',
      key: randomId(),
    },
  })

  const handleSubmit = (values: typeof form.values) => {
    setValue((prev) => (value ? [...prev, values] : [values]))
    form.reset()
  }

  

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      padding={'xl'}
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 500 }}
          sx={{ borderStyle: 'none' }}
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
      }
      aside={<RightSide />}
      // header={
      //   <Header height={70} p="md" sx={{ borderStyle: 'none' }}>
      //     <div
      //       style={{ display: 'flex', alignItems: 'center', height: '100%' }}
      //     >
      //       <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      //         <Burger
      //           opened={opened}
      //           onClick={() => setOpened((o) => !o)}
      //           size="sm"
      //           color={theme.colors.gray[6]}
      //           mr="xl"
      //         />
      //       </MediaQuery>

      //       <Text>Application header</Text>
      //     </div>
      //   </Header>
      // }
    >
      <Title>Good {getTimeOfDay()}, Doni</Title>
      <Text>
        It's {getCurrentDay()}, {getCurrentDate()} {getCurrentMonth()}
      </Text>
      <Paper
        shadow={'xs'}
        mb={20}
        p={'md'}
        radius={'md'}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.dark[0],
        })}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid align={'center'} columns={24}>
            <Grid.Col span={1}>
              <Center>
                <Checkbox
                  {...form.getInputProps('checked', { type: 'checkbox' })}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={17}>
              <TextInput
                variant="unstyled"
                placeholder="Write a new task"
                width={'full'}
                {...form.getInputProps('content')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {/* <Select
                placeholder="Pick one"
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'svelte', label: 'Svelte' },
                  { value: 'vue', label: 'Vue' },
                ]}
              /> */}
            </Grid.Col>
          </Grid>
        </form>
      </Paper>
      {value &&
        value.reverse().map((item, index) => (
          <Paper
            key={index}
            shadow={'xs'}
            p={'md'}
            mb={10}
            radius={'md'}
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.dark[0],
            })}
          >
            <Grid align={'center'} columns={24}>
              <Grid.Col span={1}>
                <Center>
                  <Checkbox checked={item.checked} />
                </Center>
              </Grid.Col>
              <Grid.Col span={17}>
                <TextInput
                  variant="unstyled"
                  placeholder="Write a new task"
                  width={'full'}
                  value={item.content}
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <DatePicker
                  placeholder="Pick date"
                  radius={'md'}
                  inputFormat="MMM DD"
                  clearable={false}
                />
              </Grid.Col>
              <Grid.Col span={2}></Grid.Col>
            </Grid>
          </Paper>
        ))}
    </AppShell>
  )
}
