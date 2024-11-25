import * as AccordionPrimitive from '@rn-primitives/accordion';
import { Text } from 'react-native';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as BaseAccordion,
} from '~/base';
import { cn } from '~/lib/utils';
type ClassNames = {
  contentClassName?: string;
  contentTextClassName?: string;
  triggerClassName?: string;
  triggerTextClassName?: string;
  itemClassName?: string;
};
type AccordionDataType = {
  title: string;
  content: string;
  value: string;
} & ClassNames;
export type AccordionProps = {
  data: AccordionDataType[];
} & AccordionPrimitive.RootProps &
  ClassNames;
export function Accordion({ data, ...props }: AccordionProps) {
  return (
    <BaseAccordion collapsible {...props}>
      {data.map((item) => (
        <AccordionItem
          value={item.value}
          className={cn(props.itemClassName, item.itemClassName)}
          key={item.value}
        >
          <AccordionTrigger className={cn(props.triggerClassName, item.triggerClassName)}>
            <Text
              className={cn(
                'text-md font-medium',
                props.triggerTextClassName,
                item.triggerTextClassName
              )}
            >
              {item.title}
            </Text>
          </AccordionTrigger>
          <AccordionContent className={cn(props.contentClassName, item.contentClassName)}>
            <Text
              className={cn(
                'text-sm text-muted-foreground',
                props.contentTextClassName,
                item.contentTextClassName
              )}
            >
              {item.content}
            </Text>
          </AccordionContent>
        </AccordionItem>
      ))}
    </BaseAccordion>
  );
}
