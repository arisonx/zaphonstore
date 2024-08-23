import {
 Table,
 TableBody,
 TableCaption,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Row } from "@tanstack/react-table";
import { ProductType } from "@/@types/products";
import { Button } from "@/components/ui/button";
import {
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
interface StockTableI {
 row: Row<ProductType>;
}
export function StockTable({ row }: StockTableI) {
 return (
  <Card className='h-[60%] w-[100%] rounded-lg p-4'>
   <Table>
    <TableHeader>
     <TableRow className='hover:bg-transparent'>
      <TableHead>ordem</TableHead>
      <TableHead>
       <DialogTrigger asChild className='border p-2'>
        <Button>adiconar estoque</Button>
       </DialogTrigger>
      </TableHead>
      <TableHead>
       <Button>limpar estoque</Button>
      </TableHead>
     </TableRow>
    </TableHeader>
    <TableBody className='flex flex-col gap-6'></TableBody>
   </Table>
 
  </Card>
 );
}
