
import { getToday } from './dates'

function getDateNumber(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return Date.UTC(year, month - 1, day) / (24 * 60 * 60 * 1000)
}

export function getCurrentStreak(completedDates) {
  if (!completedDates.length) return 0

  const dates = [...new Set(completedDates)].sort()
  const todayNumber = getDateNumber(getToday())
  const latestNumber = getDateNumber(dates[dates.length - 1])

  // A streak is active if the last check-in was today or yesterday.
  if (todayNumber - latestNumber > 1) return 0

  let streak = 1

  for (let i = dates.length - 1; i > 0; i--) {
    const current = getDateNumber(dates[i])
    const previous = getDateNumber(dates[i - 1])

    if (current - previous === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}

export function getLongestStreak(completedDates) {
  if (!completedDates.length) return 0

  const dates = [...new Set(completedDates)].sort()
  let longest = 1
  let current = 1

  for (let i = 1; i < dates.length; i++) {
    const difference =
      getDateNumber(dates[i]) - getDateNumber(dates[i - 1])

    if (difference === 1) {
      current++
    } else {
      current = 1
    }

    longest = Math.max(longest, current)
  }

  return longest
}
