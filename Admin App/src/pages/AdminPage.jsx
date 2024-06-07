import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserPlus,
  faDollarSign,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

const AdminPage = () => {
  return (
    <>
      <h1 className="py-6 pl-12 text-2xl font-medium">Dashboard</h1>
      <div className="flex items-center justify-evenly pb-16">
        <div className="flex w-3/12 items-center justify-between rounded-b-lg border-2 border-t-0 px-4 shadow-md">
          <div className="py-6">
            <h3 className="text-2xl font-medium">2</h3>
            <p className="text-gray-400">Clients</p>
          </div>
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon={faUserPlus}
              style={{ color: "#c2c2d0" }}
              size="lg"
            />
          </div>
        </div>
        <div className="flex w-3/12 items-center justify-between rounded-b-lg border-2 border-t-0 px-4 shadow-md">
          <div className="py-6">
            <h3 className="text-2xl font-medium">
              <p className="relative">
                44.779.000
                <span className="absolute -right-6 -top-1 text-base">VND</span>
              </p>
            </h3>
            <p className="text-gray-400">Earnings of Month</p>
          </div>
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon={faDollarSign}
              style={{ color: "#c2c2d0" }}
              size="lg"
            />
          </div>
        </div>
        <div className="flex w-3/12 items-center justify-between rounded-b-lg border-2 border-t-0 px-4 shadow-md">
          <div className="py-6">
            <h3 className="text-2xl font-medium">2</h3>
            <p className="text-gray-400">New Order</p>
          </div>
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              style={{ color: "#c2c2d0" }}
              size="lg"
            />
          </div>
        </div>
      </div>
      <h3 className="py-6 pl-16 text-xl font-medium">History</h3>
      <div class="relative mx-auto w-11/12 overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID User
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Phone
              </th>
              <th scope="col" class="px-6 py-3">
                Address
              </th>
              <th scope="col" class="px-6 py-3">
                Total
              </th>
              <th scope="col" class="px-6 py-3">
                Delivery
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th scope="row" class="whitespace-nowrap px-6 py-4 font-normal">
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">Chưa vận chuyển</td>
              <td class="px-6 py-4">Chưa thanh toán</td>
              <td class="px-6 py-4">
                <button className="border-2 bg-green-600 px-3 py-2 font-medium text-gray-200">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPage;
