import TermsBox from "./IccTermsBox";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxRBVz45hwktXEaKac84iNHZM2YZcRTIhQxxkhnW_0SS4VfvU8kYR3gng3-yEGcoge_/exec";

interface Props {
  onBack: () => void;
  onNext: (sheetUrl: string, sheetTarget: string) => void;
}

const IndoOnline = ({ onBack, onNext }: Props) => (
  <TermsBox
    participant="indonesian"
    competition="online"
    sheetUrl={SHEET_URL}
    sheetTarget="indo-online"   // ← FIX: lowercase, cocok dengan Apps Script
    onBack={onBack}
    onNext={onNext}
  />
);

export default IndoOnline;