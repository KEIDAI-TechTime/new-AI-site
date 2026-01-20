import { NotionRenderer as ReactNotionRenderer } from 'react-notion-x';
import type { ExtendedRecordMap } from 'notion-types';

// Import styles
import 'react-notion-x/src/styles.css';

interface NotionRendererProps {
  recordMap: ExtendedRecordMap;
  rootPageId?: string;
}

export default function NotionRenderer({ recordMap, rootPageId }: NotionRendererProps) {
  if (!recordMap) {
    return <div>Loading...</div>;
  }

  return (
    <ReactNotionRenderer
      recordMap={recordMap}
      rootPageId={rootPageId}
      fullPage={false}
      darkMode={false}
      disableHeader={true}
      components={{
        PageLink: ({ href, children }: { href: string; children: React.ReactNode }) => (
          <a href={href} className="notion-link">
            {children}
          </a>
        ),
      }}
    />
  );
}
