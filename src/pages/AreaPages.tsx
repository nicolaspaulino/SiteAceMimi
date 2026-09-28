import AreaPage from '@/components/AreaPage';
import { areaData } from '@/data/areas';

export const CivilPage = () => <AreaPage data={areaData.civil} currentPath="/direito-civil" />;
export const PenalPage = () => <AreaPage data={areaData.penal} currentPath="/direito-penal" />;
export const TrabalhistaPage = () => <AreaPage data={areaData.trabalhista} currentPath="/direito-trabalhista" />;
export const ImobiliarioPage = () => <AreaPage data={areaData.imobiliario} currentPath="/direito-imobiliario" />;
export const DigitalPage = () => <AreaPage data={areaData.digital} currentPath="/direito-digital" />;
export const EmpresarialPage = () => <AreaPage data={areaData.empresarial} currentPath="/direito-empresarial" />;
export const TributarioPage = () => <AreaPage data={areaData.tributario} currentPath="/direito-tributario" />;
