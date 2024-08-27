import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/signup', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu email').fill('johndoe@example.com')
  await page.getByLabel('Seu celular').fill('4685489616231563')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso')

  expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/signup', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Wrong name')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu email').fill('johndoe@example.com')
  await page.getByLabel('Seu celular').fill('4685489616231563')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  expect(toast).toBeVisible()
})

test('navigate to new login page', async ({ page }) => {
  await page.goto('/signup', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/signin')
})
