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
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'

import { DatePicker } from '@mantine/dates'

import RightSide from '@/components/Aside'
// import { useForm } from '@mantine/form'
import { randomId, useLocalStorage } from '@mantine/hooks'
import {
  getCurrentDate,
  getCurrentDay,
  getCurrentMonth,
  getTimeOfDay,
} from '@/utils/getTimes'

import { useForm, useWatch } from 'react-hook-form'

interface Todo {
  checked: boolean
  content: string
  key: string
}

export default function Todo() {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const [value, setValue] = useLocalStorage<Todo[]>({
    key: 'listTodo',
  })

  // const form = useForm({
  //   initialValues: {
  //     checked: false,
  //     content: '',
  //     key: randomId(),
  //   },
  // })

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm<Todo>()

  const todoSubmit = handleSubmit(async (data) => {
    setValue((prev) => (value ? [...prev, data] : [data]))
    reset({
      checked: false,
      content: '',
    })
  })

  useWatch({
    name: 'checked',
    control,
  })

  console.log(getValues('checked'))

  // const handleSubmit = (values: typeof form.values) => {
  // setValue((prev) => (value ? [...prev, values] : [values]))
  //   form.reset()
  // }

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
      <Title>Good {getTimeOfDay()}, a Doni</Title>
      <Text>
        It's {getCurrentDay()}, {getCurrentDate()} {getCurrentMonth()}
      </Text>
      <form onSubmit={todoSubmit}>
        <Paper
          mb={20}
          p={'md'}
          radius={'md'}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          })}
        >
          <Grid align={'center'}>
            <Grid.Col span={1}>
              <Center>
                <Checkbox
                  size="md"
                  // {...form.getInputProps('checked', { type: 'checkbox' })}
                  {...register('checked')}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={9}>
              <TextInput
                variant="unstyled"
                placeholder="Write a new task"
                width={'full'}
                size="md"
                // {...form.getInputProps('content')}
                {...register('content')}
              />
            </Grid.Col>
            <Grid.Col span={2}>
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
        </Paper>
      </form>
      {value &&
        value.reverse().map((item, index) => (
          <Paper
            key={index}
            p={'md'}
            mb={10}
            radius={'md'}
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.white,
            })}
          >
            <Grid align={'center'}>
              <Grid.Col span={1}>
                <Center>
                  <Checkbox checked={item.checked} size="md" />
                </Center>
              </Grid.Col>
              <Grid.Col span={9}>
                <Text
                  sx={{
                    textDecorationLine: item.checked ? 'line-through' : '',
                  }}
                >
                  {item.content}
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <DatePicker
                  placeholder="Pick date"
                  radius={'md'}
                  inputFormat="MMM DD"
                  clearable={false}
                />
              </Grid.Col>
            </Grid>
          </Paper>
        ))}
    </AppShell>
  )
}
