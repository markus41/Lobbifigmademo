/**
 * LobbiPageHeader - Reusable page header with title, description, and optional action.
 */
import type { ReactNode } from 'react'

interface LobbiPageHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function LobbiPageHeader({
  title,
  description,
  icon,
  action,
  className = '',
}: LobbiPageHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: 'var(--theme-primary, #D4AF37)', color: '#fff' }}>
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--theme-text-primary, #1F2937)' }}>
              {title}
            </h1>
            {description && (
              <p className="text-sm mt-1" style={{ color: 'var(--theme-text-muted, #9CA3AF)' }}>
                {description}
              </p>
            )}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  )
}
