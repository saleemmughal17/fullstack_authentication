// Table Components
export const Table = ({ children }) => (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  );
  
  export const TableHeader = ({ children }) => <thead>{children}</thead>;
  export const TableBody = ({ children }) => <tbody>{children}</tbody>;
  
  export const TableRow = ({ children }) => (
    <tr className="hover:bg-gray-100">{children}</tr>
  );
  
  export const TableHead = ({ children }) => (
    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
      {children}
    </th>
  );
  
  export const TableCell = ({ children }) => (
    <td className="px-4 py-2 text-sm text-gray-700">{children}</td>
  );
  