import { useMemo } from 'react';
import { Tabs as BaseTabs, TabsContent, TabsList, TabsTrigger } from '../../base/tabs';
import { Text } from '../../base/text';
import { cn } from '../../../lib/utils';

export type TabsProps = {
  tabs: {
    value: string;
    label: string;
    content?: React.ReactNode;
  }[];
  containerClassName?: string;
  triggerClassName?: string;
  listClassName?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  contentClassName?: string;
};
export function Tabs(props: TabsProps) {
  const renderTabTriggers = useMemo(() => {
    return props.tabs.map((tab) => (
      <TabsTrigger
        value={tab.value}
        className={cn('flex-1', props.triggerClassName)}
        key={tab.value}
      >
        <Text>{tab.label}</Text>
      </TabsTrigger>
    ));
  }, [props.tabs, props.triggerClassName]);
  const renderTabContents = useMemo(() => {
    return props.tabs.map((tab) => (
      <TabsContent value={tab.value} key={tab.value} className={cn(props.contentClassName)}>
        {tab.content}
      </TabsContent>
    ));
  }, [props.tabs, props.contentClassName]);
  return (
    <BaseTabs
      value={props.value!}
      onValueChange={props.onValueChange!}
      className={cn('flex-col gap-4', props.containerClassName)}
    >
      <TabsList className={cn(props.listClassName, 'flex-row w-full')}>
        {renderTabTriggers}
      </TabsList>

      {renderTabContents}
    </BaseTabs>
  );
}
