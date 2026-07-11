import {TabIndentationExtension} from '@lexical/extension';
import {HistoryExtension} from '@lexical/history';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalExtensionComposer} from '@lexical/react/LexicalExtensionComposer';
import {RichTextExtension} from '@lexical/rich-text';
import {defineExtension} from 'lexical';

import {ToolbarPlugin} from './plugins/ToolbarPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from 'react';

const theme = {
  heading: {
    h1: 'mb-2 text-3xl font-bold',
    h2: 'mb-2 text-2xl font-bold',
    h3: 'mb-1 text-xl font-semibold',
  },
  paragraph: 'my-0',
  quote:
    'my-2 border-l-4 [border-left-style:solid] border-zinc-300 pl-4 italic text-zinc-500 dark:border-zinc-600 dark:text-zinc-400',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
  },
};

function MyOnChangePlugin({ onChange }){
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}


const landingHeroExtension = defineExtension({
  dependencies: [RichTextExtension, HistoryExtension, TabIndentationExtension],
  name: '@lexical/website/landing-hero-editor',
  namespace: '@lexical/website/landing-hero-editor',
  theme,
});

export default function Editor() {

  const [editorState, setEditorState] = useState(null);


  function onChange(editorState){
    const editorStatJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStatJSON));
    console.log('Editor state changed:', editorState);
  }

  return (
    <LexicalExtensionComposer
      extension={landingHeroExtension}
      contentEditable={null}>
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-solid border-black/10 dark:border-white/10 dark:bg-stone-800">
        <ToolbarPlugin />
        <div className="relative">
          <ContentEditable
            className="h-100 overflow-y-auto p-4 text-base leading-relaxed text-wrap outline-none"
            aria-label="Rich text editor"
            aria-placeholder="Introduce algún texto..."
            placeholder={
              <div className="pointer-events-none absolute top-4 left-4 text-zinc-400 select-none">
                Introduce algún texto...
              </div>
            }
          />
        </div>
      </div>
      <MyOnChangePlugin onChange={onChange}/>
    </LexicalExtensionComposer>
  );
}