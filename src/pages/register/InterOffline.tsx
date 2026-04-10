import TermsBox from "./TermsBox";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbylqhWttZ6pjomknohOmLNlBUC-JAu1KxdElZUBiFZrSZ_uQQqwKKrD3Q1eVgdY_0no/exec";
interface Props {
  onBack: () => void;
  onNext: (sheetUrl: string, sheetTarget: string) => void;
}

const InterOffline = ({ onBack, onNext }: Props) => (
  <TermsBox
    participant="international"
    competition="offline"
    sheetUrl={SHEET_URL}
    sheetTarget="inter-offline"
    onBack={onBack}
    onNext={onNext}
  />
);

export default InterOffline;