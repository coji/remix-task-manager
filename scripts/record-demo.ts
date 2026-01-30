import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { chromium } from 'playwright'

const VIDEO_DIR = './demo-videos'
const OUTPUT_DIR = './demo-gifs'
const BASE_URL = 'http://localhost:5173'

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function videoToGif(videoPath: string, outputName: string) {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true })

  const outputPath = `${OUTPUT_DIR}/${outputName}.gif`

  // ffmpegで動画からGIFに変換（高品質パレット生成）
  execSync(
    `ffmpeg -y -i ${videoPath} -vf "fps=30,scale=500:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" ${outputPath}`,
    { stdio: 'inherit' },
  )
  console.log(`  ✓ Generated: ${outputPath}`)
}

async function main() {
  console.log('🎬 Starting demo recording...\n')

  if (existsSync(VIDEO_DIR)) rmSync(VIDEO_DIR, { recursive: true })
  mkdirSync(VIDEO_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: false })

  // 各シナリオを個別に録画
  const scenarios = [
    {
      name: '01-task-add',
      desc: 'animate.enter + tween counter',
      run: async (page: Awaited<ReturnType<typeof browser.newPage>>) => {
        await page.goto(BASE_URL)
        await page.waitForSelector('h1')
        await sleep(800)
        const input = page.locator('input[type="text"]')
        await input.fill('New task from Playwright')
        await sleep(400)
        await page.keyboard.press('Enter')
        await sleep(1000)
      },
    },
    {
      name: '02-task-delete',
      desc: 'tween animation',
      run: async (page: Awaited<ReturnType<typeof browser.newPage>>) => {
        await page.goto(BASE_URL)
        await page.waitForSelector('h1')
        await sleep(800)
        const deleteBtn = page.locator('button:has-text("Delete")').first()
        await deleteBtn.click()
        await sleep(800)
      },
    },
    {
      name: '03-filter-switch',
      desc: 'spring layout',
      run: async (page: Awaited<ReturnType<typeof browser.newPage>>) => {
        await page.goto(BASE_URL)
        await page.waitForSelector('h1')
        await sleep(600)
        await page.click('button:has-text("Active")')
        await sleep(500)
        await page.click('button:has-text("Completed")')
        await sleep(500)
        await page.click('button:has-text("All")')
        await sleep(600)
      },
    },
    {
      name: '04-checkbox-toggle',
      desc: 'spring.transition',
      run: async (page: Awaited<ReturnType<typeof browser.newPage>>) => {
        await page.goto(BASE_URL)
        await page.waitForSelector('h1')
        await sleep(600)
        const checkbox = page.locator('input[type="checkbox"]').first()
        await checkbox.click()
        await sleep(600)
        await checkbox.click()
        await sleep(600)
      },
    },
    {
      name: '05-theme-toggle',
      desc: 'animate enter/exit',
      run: async (page: Awaited<ReturnType<typeof browser.newPage>>) => {
        await page.goto(BASE_URL)
        await page.waitForSelector('h1')
        await sleep(600)
        await page.click('button:has-text("🌙"), button:has-text("☀️")')
        await sleep(800)
        await page.click('button:has-text("🌙"), button:has-text("☀️")')
        await sleep(800)
      },
    },
    {
      name: '06-input-focus',
      desc: 'spring.transition',
      run: async (page: Awaited<ReturnType<typeof browser.newPage>>) => {
        await page.goto(BASE_URL)
        await page.waitForSelector('h1')
        await sleep(600)
        const input = page.locator('input[type="text"]')
        await input.focus()
        await sleep(800)
        await input.blur()
        await sleep(600)
      },
    },
  ]

  for (let i = 0; i < scenarios.length; i++) {
    const scenario = scenarios[i]
    console.log(`📹 ${i + 1}/${scenarios.length}: ${scenario.name} (${scenario.desc})`)

    // 動画録画付きでコンテキスト作成
    const context = await browser.newContext({
      viewport: { width: 500, height: 600 },
      deviceScaleFactor: 2,
      recordVideo: {
        dir: VIDEO_DIR,
        size: { width: 1000, height: 1200 },
      },
    })

    const page = await context.newPage()
    await scenario.run(page)
    await page.close()
    await context.close()

    // 録画されたビデオファイルをリネーム
    const videos = readdirSync(VIDEO_DIR).filter((f) => f.endsWith('.webm'))
    const latestVideo = videos[videos.length - 1]
    if (latestVideo) {
      const videoPath = `${VIDEO_DIR}/${scenario.name}.webm`
      renameSync(`${VIDEO_DIR}/${latestVideo}`, videoPath)
      videoToGif(videoPath, scenario.name)
    }
  }

  await browser.close()

  // クリーンアップ
  if (existsSync(VIDEO_DIR)) {
    rmSync(VIDEO_DIR, { recursive: true })
  }

  console.log('\n✅ All demos recorded!')
  console.log(`\n📁 Output: ${OUTPUT_DIR}/`)
  const files = readdirSync(OUTPUT_DIR).filter((f) => f.endsWith('.gif'))
  for (const f of files) {
    console.log(`   - ${f}`)
  }
}

main().catch(console.error)
