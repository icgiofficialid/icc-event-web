import TermsBox from "./IccTermsBox";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxfoz-AoQdSet82o8FeJliRekcg1vPHYj1s-6F1jRCmLWcOmjJ9xtY5rrLDBHOOD9AamA/exec";

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