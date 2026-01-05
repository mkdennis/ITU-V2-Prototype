import { useState, useEffect, useRef } from 'react'
import './NavigationHeader.css'

interface Tab {
  id: string
  label: string
  sectionId: string
}

const tabs: Tab[] = [
  { id: 'basic-information', label: 'Basic Information', sectionId: 'basic-information-section' },
  { id: 'item-details', label: 'Item Details', sectionId: 'item-details-section' },
  { id: 'description', label: 'Description', sectionId: 'description-section' },
  { id: 'images', label: 'Images', sectionId: 'images-section' },
]

function NavigationHeader() {
  const [activeTab, setActiveTab] = useState('basic-information')
  const [underlineStyle, setUnderlineStyle] = useState({ translateX: 0, width: 0 })
  const navRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const isScrollingProgrammatically = useRef(false)

  const updateUnderline = (tabId: string) => {
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      const activeButton = tabRefs.current[tabId]
      const nav = navRef.current

      if (activeButton && nav) {
        const navRect = nav.getBoundingClientRect()
        const buttonRect = activeButton.getBoundingClientRect()
        
        setUnderlineStyle({
          translateX: buttonRect.left - navRect.left,
          width: buttonRect.width
        })
      }
    })
  }

  useEffect(() => {
    // Initial position
    updateUnderline(activeTab)
  }, [])

  useEffect(() => {
    // Update when activeTab changes
    updateUnderline(activeTab)
  }, [activeTab])

  useEffect(() => {
    const handleResize = () => {
      updateUnderline(activeTab)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeTab])

  const handleTabClick = (tabId: string, sectionId: string) => {
    setActiveTab(tabId)
    isScrollingProgrammatically.current = true
    
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 100 // Approximate header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Reset flag after scroll animation completes
      setTimeout(() => {
        isScrollingProgrammatically.current = false
      }, 1000)
    }
  }

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      // Ignore scroll events during programmatic scrolling
      if (isScrollingProgrammatically.current) {
        return
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 120 // Offset for header

          for (let i = tabs.length - 1; i >= 0; i--) {
            const element = document.getElementById(tabs[i].sectionId)
            if (element) {
              const elementTop = element.offsetTop
              if (scrollPosition >= elementTop) {
                setActiveTab((prevTab) => {
                  // Only update if it's actually different
                  if (prevTab !== tabs[i].id) {
                    return tabs[i].id
                  }
                  return prevTab
                })
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="navigation-header">
      <div className="header-content">
        <h1 className="header-title">Create New Listing</h1>
        <nav className="header-nav" ref={navRef}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el
              }}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id, tab.sectionId)}
            >
              {tab.label}
            </button>
          ))}
          <div 
            className="nav-underline"
            style={{
              transform: `translate3d(${underlineStyle.translateX}px, 0px, 0px)`,
              width: `${underlineStyle.width}px`
            }}
          />
        </nav>
      </div>
    </header>
  )
}

export default NavigationHeader

