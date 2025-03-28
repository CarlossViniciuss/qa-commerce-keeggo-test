export function calcularTotais(produtos, frete = 19.90) {
    const totalProdutos = produtos.reduce((acc, item) => {
      const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
      return acc + preco * parseInt(item.quantidade);
    }, 0);
  
    const totalComFrete = totalProdutos + frete;
  
    return {
      totalProdutos: `R$${totalProdutos.toFixed(2)}`,
      frete: `R$${frete.toFixed(2)}`,
      totalComFrete: `R$${totalComFrete.toFixed(2)}`,
    };
}
  