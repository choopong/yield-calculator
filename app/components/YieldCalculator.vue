<script setup lang="ts">
function parseNumericValue(raw: string): number | null {
  const cleaned = raw.replace(/,/g, '')
  if (cleaned === '' || cleaned === '.') return null
  const parsed = Number(cleaned)
  return Number.isNaN(parsed) ? null : parsed
}

function formatWithThousands(raw: string): string {
  const cleaned = raw.replace(/,/g, '')
  const [intPart = '', decimalPart] = cleaned.split('.')
  const groupedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decimalPart !== undefined ? `${groupedInt}.${decimalPart}` : groupedInt
}

// text input formatted with thousands separators; keeps a parsed numeric value in sync
function useThousandsInput() {
  const numeric = ref<number | null>(null)
  const display = ref('')

  function onInput(event: Event) {
    const input = event.target as HTMLInputElement
    const cursorFromEnd =
      input.value.length - (input.selectionStart ?? input.value.length)

    const cleaned = input.value.replace(/[^\d.]/g, '')
    const formatted = formatWithThousands(cleaned)

    numeric.value = parseNumericValue(cleaned)
    display.value = formatted
    // Vue skips the :value patch when the ref is unchanged, so sync the DOM directly too
    input.value = formatted

    const pos = Math.max(formatted.length - cursorFromEnd, 0)
    input.setSelectionRange(pos, pos)
  }

  return { numeric, display, onInput }
}

const price = useThousandsInput()
const cost = useThousandsInput()
const income = useThousandsInput()

// yield = ((income - cost) * 12) / price, expressed as a percentage
const yieldPercent = computed(() => {
  if (!price.numeric.value) return null
  return (
    ((((income.numeric.value ?? 0) - (cost.numeric.value ?? 0)) * 12) /
      price.numeric.value) *
    100
  )
})

// time to recoup the price from net monthly income, rounded up to whole months
const roiPeriod = computed(() => {
  if (!price.numeric.value) return null
  const netMonthly = (income.numeric.value ?? 0) - (cost.numeric.value ?? 0)
  if (netMonthly <= 0) return null

  const totalMonths = Math.ceil(price.numeric.value / netMonthly)
  return { years: Math.floor(totalMonths / 12), months: totalMonths % 12 }
})

function formatRoiPeriod(period: { years: number; months: number }): string {
  const parts: string[] = []
  if (period.years > 0) parts.push(`${period.years} ${period.years === 1 ? 'year' : 'years'}`)
  if (period.months > 0) parts.push(`${period.months} ${period.months === 1 ? 'month' : 'months'}`)
  return parts.join(' ')
}
</script>

<template>
  <div class="yield-calculator">
    <h1>Yield Calculator</h1>

    <div class="field">
      <label for="price">Price</label>
      <input id="price" :value="price.display.value" @input="price.onInput" type="text" inputmode="decimal"
        placeholder="0" />
    </div>
    <div class="field">
      <label for="cost">Cost (per month)</label>
      <input id="cost" :value="cost.display.value" @input="cost.onInput" type="text" inputmode="decimal"
        placeholder="0" />
    </div>
    <div class="field">
      <label for="income">Income (per month)</label>
      <input id="income" :value="income.display.value" @input="income.onInput" type="text" inputmode="decimal"
        placeholder="0" />
    </div>
    <div class="result">
      <div>
        <strong>Yield: </strong>
        <span v-if="yieldPercent !== null">{{ yieldPercent.toFixed(2) }}%</span>
        <span v-else>—</span>
      </div>
      <div>
        <strong>ROI within: </strong>
        <span v-if="roiPeriod">{{ formatRoiPeriod(roiPeriod) }}</span>
        <span v-else>—</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.yield-calculator {
  max-width: 360px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
  color: #f0f0f0;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.field label {
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: #cccccc;
}

.field input {
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #2a2a2a;
  color: #f0f0f0;
}

.field input::placeholder {
  color: #777777;
}

.field input:focus {
  outline: none;
  border-color: #6c9eff;
}

.result {
  margin-top: 1.5rem;
  font-size: 1.25rem;
  text-align: center;
}
</style>
