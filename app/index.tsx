import { ScanBarcode } from '@tamagui/lucide-icons';
import { Stack, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { H3, Theme } from 'tamagui';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { useBarcodeData } from './BarcodeDataContext';

export default function Home() {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  console.log(colorScheme); // 'light' or 'dark'
  const { barcodeData } = useBarcodeData();

  return (
    <>
      <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
        <Stack.Screen options={{ title: 'Nutriswiss' }} />
        <Container>
          <ScreenContent path="app/index.tsx" title="Home" />
          <H3>{barcodeData}</H3>
          <Link href={{ pathname: '/scanner' }} asChild>
            <Button
              icon={ScanBarcode}
              scaleIcon={2}
              title=""
              width={48}
              height={48}
              alignSelf="flex-end"
            />
          </Link>
        </Container>
      </Theme>
    </>
  );
}
