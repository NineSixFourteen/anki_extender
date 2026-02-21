import './CardCounter.css'

export default function CardCoutner(props: { label: string; value: string | number }) {
  return (
    <div class="stats-card">
      <div class="card-inner">
        <span class="card-label">{props.label}</span>
        <span class="card-value">{props.value}</span>
      </div>
    </div>
  );
}