

import { allTools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BinaryToIpConverter } from '@/app/tools/binary-to-ip/binary-to-ip-converter';
import { IpToBinaryConverter } from '@/app/tools/ip-to-binary/ip-to-binary-converter';
import { SubnetCalculator } from '@/app/tools/subnet-calculator/subnet-calculator';
import { SubnetMaskConverter } from '@/app/tools/subnet-mask-converter/subnet-mask-converter';
import { VlsmCalculator } from '@/app/tools/vlsm-calculator/vlsm-calculator';
import { BandwidthEstimator } from '@/app/tools/bandwidth-estimator/bandwidth-estimator';
import { LatencyEstimator } from '@/app/tools/latency-estimator/latency-estimator';
import { PasswordStrengthChecker } from '@/app/tools/password-strength-checker/password-strength-checker';
import { DataTransferTimeCalculator } from '@/app.