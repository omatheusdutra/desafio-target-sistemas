export default async function fetchData() {
  try {
    const res = await fetch('./dados.json');
    if (!res.ok) {
      throw new Error('Erro ao buscar dados: ' + res.statusText);
    }
    const data = await res.json();
    handleData(data);
  } catch (error) {
    console.error('Erro ao processar os dados:', error);
  }
}

const handleData = (data) => {
  const faturamentosValidos = data.filter((element) => element.valor > 0);
  
  if (faturamentosValidos.length === 0) {
    console.log('Nenhum faturamento válido encontrado.');
    return;
  }

  const valores = faturamentosValidos.map((element) => element.valor);
  const highest = Math.max(...valores);
  const lowest = Math.min(...valores);
  const sum = valores.reduce((total, number) => total + number, 0);
  const average = sum / valores.length;
  const greaterAverage = valores.filter((number) => number > average);

  const normalizeNumbers = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const dayMost = document.getElementById('dayMost');
  const dayLeast = document.getElementById('dayLeast');
  const monthlyAvg = document.getElementById('monthlyAvg');

  dayMost.textContent = `O maior valor de faturamento: R$ ${normalizeNumbers.format(highest)}`;
  dayLeast.textContent = `O menor valor de faturamento: R$ ${normalizeNumbers.format(lowest)}`;
  monthlyAvg.innerHTML = `Nº de dias no mês em que o valor de faturamento diário foi superior à média mensal: ${greaterAverage.length} dias`;
};
