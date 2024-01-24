import './styles.scss';

type IncomeCardProps = {
  title: string,
  value: number
}

function IncomeCard({ title, value }: IncomeCardProps) {

  const backgroundColor = title === 'Entradas' ? 'linear-gradient(45deg, green, gray)' : title === 'Saídas' ? 'linear-gradient(45deg, red, gray)' : 'linear-gradient(45deg, aqua, gray)';

  return (
    <div className="income-card" style={{ background: backgroundColor }}>
      <h2>{title}</h2>
      <h3>R$ {value.toFixed(2)}</h3>
    </div>
  );
}

export default IncomeCard;