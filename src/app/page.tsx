'use client';
import { Field } from '@/components/Field';
import { Radio } from '@/components/Radio';
import { Input } from '@/components/Input';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { Product } from '@/components/product';
import { useEffect, useState } from 'react';
import { SortButton } from '@/components/SortButton';
import ReactPaginate from 'react-paginate';

type Option = {
  value: string;
  label: string;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  index: number;
};

type Search = {
  keyword: string;
  priceMin: number | undefined;
  priceMax: number | undefined;
  categories: string[];
  inStock: boolean | undefined;
  total: number;
  page: number;
};

type FormError = Partial<Record<keyof Search, string>>;

const categoryMap: Record<string, string> = {
  1: 'A',
  2: 'C',
  3: 'B',
  4: 'D',
  5: 'E',
};

const productRawData: Product[] = [];

// 生成一萬筆資料
for (let i = 0; i < 10000; i++) {
  const categoryKeys = Object.keys(categoryMap);
  const categoryIndex = ((i % categoryKeys.length) + 1).toString();
  productRawData.push({
    id: `id-${i + 1}`,
    name: `Item ${i + 1}`,
    category: categoryMap[categoryIndex],
    price: Math.round(Math.random() * 1000 * 3),
    inStock: i % 2 === 0 ? true : false,
    index: i,
  });
}

const productCategories: Option[] = [
  { value: 'A', label: '類別A' },
  { value: 'B', label: '類別B' },
  { value: 'C', label: '類別C' },
  { value: 'D', label: '類別D' },
  { value: 'E', label: '類別E' },
];

const initSearchData: Search = {
  keyword: '',
  priceMin: undefined,
  priceMax: undefined,
  categories: [],
  inStock: undefined,
  total: 0,
  page: 1,
};

export default function Home() {
  const [formData, setFormData] = useState<Search>(initSearchData);
  const [formErrorData, setFormErrorData] = useState<FormError>({});
  const [searchData, setSearchData] = useState<Search>(initSearchData);
  const [searchProductDataNum, setSearchProductDataNum] = useState<number>(0);
  const [productData, setProductData] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);

  const [sortData, setSortData] = useState<{ id: string | null; state: 'ASC' | 'DESC' | null }>({
    id: null,
    state: null,
  });

  const formDataHandler = (data: Search) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const formCategoriesDataHandler = (value: string, checked: boolean) => {
    let formCategories = [...formData.categories];
    if (checked) {
      formCategories.push(value);
    } else {
      formCategories = formCategories.filter((item) => item !== value);
    }
    setFormData((prev) => ({ ...prev, categories: formCategories }));
  };

  const searchPageHandler = (page: number) => {
    setSearchData((prev) => ({ ...prev, page }));
  };

  const setFormDataToSearchData = () => {
    setSearchData((prev) => ({ ...prev, ...formData, page: 1 }));
  };

  const resetSearchDataHandler = () => {
    setFormData(initSearchData);
    setFormErrorData({});
  };

  const sortProductData = (data: Product[]) => {
    const { id, state } = sortData;
    if (!id && !state) return data.toSorted((a, b) => a.index - b.index);

    switch (id) {
      case 'price':
        if (!state) return data;
        return data.toSorted((a, b) => (state === 'ASC' ? a.price - b.price : b.price - a.price));
        break;
      default:
        return data;
    }
  };

  const priceErrorHandler = (priceMin: number | undefined, priceMax: number | undefined) => {
    let hasPriceError = false;
    const priceErrors = {
      priceMin: '',
      priceMax: '',
    };

    if (priceMax && priceMin && priceMin > priceMax) {
      priceErrors.priceMin = '不得高於最高金額';
      priceErrors.priceMax = '不得低於最低金額';
      hasPriceError = true;
    }

    setFormErrorData((prev) => ({ ...prev, ...priceErrors }));
    return hasPriceError;
  };

  const search = () => {
    const { keyword, priceMin, priceMax, categories, inStock, page } = searchData;

    const hasPriceError = priceErrorHandler(priceMin, priceMax);
    if (hasPriceError) return;

    const pageSize = 10;

    const filteredData = productRawData.filter((product) => {
      const matchKeyword = product.name.toLowerCase().includes(keyword.toLowerCase());
      const matchPriceMin = product.price >= (priceMin || 0);
      const matchPriceMax = product.price <= (priceMax || Infinity);
      const matchCategory = categories.length ? categories.includes(product.category) : true;
      const matchInStock = inStock !== undefined ? product.inStock === inStock : true;
      return matchKeyword && matchPriceMin && matchPriceMax && matchCategory && matchInStock;
    });

    setSearchProductDataNum(filteredData.length);

    setPageCount(Math.ceil(filteredData.length / pageSize));

    const paginatedData = filteredData.slice(pageSize * (page - 1), pageSize * page);

    if (sortData.id && sortData.state) {
      const paginatedSortedData = sortProductData(paginatedData);
      setProductData(paginatedSortedData);
    } else {
      setProductData(paginatedData);
    }
  };

  const sortDataHandler = (id: string, state: 'ASC' | 'DESC') => {
    if (sortData.id === id && sortData.state === state) {
      setSortData({ id: null, state: null });
    } else {
      setSortData({ id, state });
    }
  };

  // 當 sortData 改變時重新排序
  useEffect(() => {
    const sortedProductData = sortProductData(productData);
    setProductData(sortedProductData);
  }, [sortData]);

  // 頁碼及 searchData 變動時搜尋
  useEffect(() => {
    search();
  }, [searchData]);

  return (
    <div className="px-4 md:px-8 lg:px-10">
      <div className="max-w-[1200px] mx-auto py-4 md:py-10">
        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          <h2 className=" md:col-span-3 text-2xl font-bold text-primary">商品搜尋</h2>
          <div className="md:col-span-1">
            <Field
              id="name"
              label="商品關鍵字"
              children={
                <Input
                  id="name"
                  value={formData.keyword}
                  onChange={(e) => formDataHandler({ ...formData, keyword: e.target.value })}
                />
              }
            ></Field>
          </div>
          <div className="col-span-1">
            <Field
              id="priceMin"
              label="最低價格"
              error={formErrorData.priceMin}
              children={
                <Input
                  id="priceMin"
                  type="number"
                  value={formData.priceMin ?? ''}
                  onChange={(e) => formDataHandler({ ...formData, priceMin: Number(e.target.value) })}
                />
              }
            ></Field>
          </div>
          <div className="col-span-1">
            <Field
              id="priceMax"
              label="最高價格"
              error={formErrorData.priceMax}
              children={
                <Input
                  id="priceMax"
                  type="number"
                  value={formData.priceMax ?? ''}
                  onChange={(e) => formDataHandler({ ...formData, priceMax: Number(e.target.value) })}
                />
              }
            ></Field>
          </div>
          <div className="col-span-1">
            <Field
              label="是否有庫存"
              children={
                <div className="flex gap-2">
                  <Radio
                    name="inStock"
                    value={true}
                    label="是"
                    checked={formData.inStock === true}
                    onChange={(e) => formDataHandler({ ...formData, inStock: true })}
                  />
                  <Radio
                    name="inStock"
                    value={false}
                    label="否"
                    checked={formData.inStock === false}
                    onChange={(e) => formDataHandler({ ...formData, inStock: false })}
                  />
                </div>
              }
            ></Field>
          </div>
          <div className="md:col-span-2">
            <Field
              label="商品類別"
              children={
                <div className="flex gap-2 flex-wrap">
                  {productCategories.map((category) => (
                    <Checkbox
                      key={category.value}
                      value={category.value}
                      label={category.label}
                      checked={formData.categories.includes(category.value)}
                      onChange={(e) => formCategoriesDataHandler(e.target.value, e.target.checked)}
                    />
                  ))}
                </div>
              }
            ></Field>
          </div>

          {/* Action */}
          <div className="md:col-span-2"></div>
          <div className="col-span-1">
            <div className="flex gap-2 justify-end">
              <div className="grow">
                <Button color="gray-200" content="重設" onClick={resetSearchDataHandler} />
              </div>
              <div className="grow">
                <Button color="primary" content="搜尋" onClick={() => setFormDataToSearchData()} />
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="my-6">
          <div className=" flex justify-between items-center">
            <p className="text-md ">共有 {searchProductDataNum} 項商品</p>
            {productData?.length ? (
              <div className="md:hidden">
                <select
                  value={`${sortData.id}-${sortData.state}`}
                  onChange={(e) =>
                    sortDataHandler(e.target.value.split('-')[0], e.target.value.split('-')[1] as 'ASC' | 'DESC')
                  }
                >
                  <option value="">請選擇價格排序</option>
                  <option value="price-ASC">價格低至高</option>
                  <option value="price-DESC">價格高至低</option>
                </select>
              </div>
            ) : (
              <></>
            )}
          </div>
          {productData?.length ? (
            <>
              <table className="w-full my-4">
                <thead className="hidden md:table-header-group">
                  <tr>
                    <th className="product-table-cell">
                      <div className="flex gap-1 items-center justify-between">商品名稱</div>
                    </th>
                    <th className="product-table-cell">
                      <div className="flex gap-1 items-center justify-between">類別</div>
                    </th>
                    <th className="product-table-cell">
                      <div className="flex gap-1 items-center justify-between">
                        價格
                        <SortButton
                          id="price"
                          state={sortData}
                          ascOnClick={() => sortDataHandler('price', 'ASC')}
                          desOnClick={() => sortDataHandler('price', 'DESC')}
                        />
                      </div>
                    </th>
                    <th className="product-table-cell">
                      <div className="flex gap-1 items-center justify-between">有庫存</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="flex flex-col gap-2 md:table-row-group">
                  {productData.map((product, index) => (
                    <Product index={index} data={product} key={index} />
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col">
                <ReactPaginate
                  className="flex gap-1 w-full justify-center"
                  previousClassName="pagination-bullet"
                  pageClassName="pagination-bullet"
                  nextLinkClassName="pagination-bullet"
                  activeClassName="bg-primary text-white"
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={(e) => searchPageHandler(e.selected + 1)}
                  pageRangeDisplayed={3}
                  forcePage={searchData.page - 1}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                />
              </div>
            </>
          ) : (
            <p className="text-center">無搜尋結果</p>
          )}
        </div>
      </div>
    </div>
  );
}
