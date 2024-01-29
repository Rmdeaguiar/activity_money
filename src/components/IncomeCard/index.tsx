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
      <h3>{value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h3>
    </div>
  );
}

export default IncomeCard;