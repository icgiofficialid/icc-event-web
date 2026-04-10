import TermsBox from "./IccTermsBox";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbylqhWttZ6pjomknohOmLNlBUC-JAu1KxdElZUBiFZrSZ_uQQqwKKrD3Q1eVgdY_0no/exec";

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