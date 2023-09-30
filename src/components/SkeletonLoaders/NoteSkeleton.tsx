'use client'

import { useTheme } from 'next-themes'
import ContentLoader from 'react-content-loader'
const NoteSkeleton = () => {
  const { theme } = useTheme()

  const isDarkTheme = theme === 'dark'

  return (
    <ContentLoader
      height="500"
      width="1000"
      viewBox="0 0 265 230"
      backgroundColor={isDarkTheme ? '#838392' : '#F3F4F6'}
      foregroundColor={isDarkTheme ? '#a5a5b8' : '#E5E7EB'}
    >
      <rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
      <rect x="15" y="45" rx="2" ry="2" width="350" height="150" />
      <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
      <rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
    </ContentLoader>
  )
}

export { NoteSkeleton }
