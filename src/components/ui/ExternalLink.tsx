import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  /** Defaults to true for http(s) URLs. Placeholder '#' links never open a new tab. */
  newTab?: boolean;
}

export function ExternalLink({ href, children, newTab, ...rest }: ExternalLinkProps) {
  const opensNewTab = href !== '#' && (newTab ?? /^https?:\/\//i.test(href));

  return (
    <a
      href={href}
      {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {opensNewTab && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  );
}
