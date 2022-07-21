import { useState } from 'react'
import {
  AppShell,
  TextInput,
  Checkbox,
  Paper,
  Grid,
  Center,
  Title,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useLocalStorage } from '@mantine/hooks'

import {
  getCurrentDate,
  getCurrentDay,
  getCurrentMonth,
  getTimeOfDay,
} from '@/utils/getTimes'

import RightSide from '@/components/Aside'
import SideNavbar from '@/components/Navbar'
import { useForm, useWatch } from 'react-hook-form'

interface Todo {
  checked: boolean
  content: string
  key: string
}

export default function Todo() {
  const [value, setValue] = useLocalStorage<Todo[]>({
    key: 'listTodo',
  })

  const { register, handleSubmit, reset, control, getValues } = useForm<Todo>()

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

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      padding={'xl'}
      fixed
      navbar={<SideNavbar />}
      aside={<RightSide />}
    >
      <Title>Good {getTimeOfDay()}, Doni</Title>
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
                <Checkbox size="md" {...register('checked')} />
              </Center>
            </Grid.Col>
            <Grid.Col span={9}>
              <TextInput
                variant="unstyled"
                placeholder="Write a new task"
                width={'full'}
                size="md"
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
