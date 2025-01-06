import { ReactNode, useCallback, useRef, useEffect, useState } from 'react';
import { Platform, type View, type ViewStyle } from 'react-native';
import { create } from 'zustand';

const DEFAULT_PORTAL_HOST = 'INTERNAL_PRIMITIVE_DEFAULT_HOST_NAME';

type PortalMap = Map<string, ReactNode>;
type PortalHostMap = Map<string, PortalMap>;

const usePortal = create<{ map: PortalHostMap }>(() => ({
  map: new Map<string, PortalMap>().set(DEFAULT_PORTAL_HOST, new Map<string, ReactNode>()),
}));

const updatePortal = (hostName: string, name: string, children: ReactNode) => {
  usePortal.setState((prev) => {
    const next = new Map(prev.map);
    const portal = next.get(hostName) ?? new Map<string, ReactNode>();
    portal.set(name, children);
    next.set(hostName, portal);
    return { map: next };
  });
};
const removePortal = (hostName: string, name: string) => {
  usePortal.setState((prev) => {
    const next = new Map(prev.map);
    const portal = next.get(hostName) ?? new Map<string, ReactNode>();
    portal.delete(name);
    next.set(hostName, portal);
    return { map: next };
  });
};

export function PortalHost({ name = DEFAULT_PORTAL_HOST }: { name?: string }) {
  const portalMap = usePortal((state) => state.map).get(name) ?? new Map<string, ReactNode>();
  if (portalMap.size === 0) return null;
  return <>{Array.from(portalMap.values())}</>;
}

export function Portal({
  name,
  hostName = DEFAULT_PORTAL_HOST,
  children,
}: {
  name: string;
  hostName?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    updatePortal(hostName, name, children);
  }, [hostName, name, children]);

  useEffect(() => {
    return () => {
      removePortal(hostName, name);
    };
  }, [hostName, name]);

  return null;
}

const ROOT: ViewStyle = {
  flex: 1,
};

/**
 * @deprecated use `FullWindowOverlay` from `react-native-screens` instead
 * @example
import { FullWindowOverlay } from "react-native-screens"
const WindowOverlay = Platform.OS === "ios" ? FullWindowOverlay : Fragment
// Wrap the `<PortalHost/>` with `<WindowOverlay/>`
<WindowOverlay><PortalHost/></WindowOverlay>
 */
export function useModalPortalRoot() {
  const ref = useRef<View>(null);
  const [sideOffset, setSideOffSet] = useState(0);

  const onLayout = useCallback(() => {
    if (Platform.OS === 'web') return;
    ref.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      setSideOffSet(-pageY);
    });
  }, []);

  return {
    ref,
    sideOffset,
    onLayout,
    style: ROOT,
  };
}
