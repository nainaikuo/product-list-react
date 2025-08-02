type Props = {
  index: number;
  data: {
    name: string;
    category: string;
    price: number;
    inStock: boolean;
  };
};

export const Product: React.FC<Props> = ({ index, data }) => {
  return (
    <tr
      className={`${index % 2 ? 'md:bg-gray-200' : ''} flex flex-col md:table-row bg-white border border-gray-400 rounded-lg p-4 `}
    >
      <td className="product-table-cell">
        <span className="md:hidden">名稱：</span>
        {data.name}
      </td>
      <td className="product-table-cell">
        <span className="md:hidden">商品類別：</span>
        {data.category}
      </td>
      <td className="product-table-cell">
        <span className="md:hidden">價格：</span>$ {data.price}
      </td>
      <td className="product-table-cell">
        <span className="md:hidden">是否有庫存：</span>
        {data.inStock ? '是' : '否'}
      </td>
    </tr>
  );
};
