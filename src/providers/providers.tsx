"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export interface ProvidersProps {
	children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<NextUIProvider>
			<NextThemesProvider attribute="class" enableSystem={false} defaultTheme="dark">{children}</NextThemesProvider>
		</NextUIProvider>
	);
}