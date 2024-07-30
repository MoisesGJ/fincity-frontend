import Link from 'next/link';
import Papa from 'papaparse';

import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['CSV'];

export default function DragDrop({ status, create }) {
  const handleChange = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        create(results.data);
      },
    });
  };

  return (
    <div
      className={`${
        status ? 'block' : 'hidden'
      } mt-5 flex flex-col gap-4 [&>label]:border-none [&>label]:my-5  [&_label_div]:ms-2 [&_path]:fill-purple-600`}
    >
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        label={'Arrastra y suelta el archivo aquí...'}
      />
      <Link
        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/file/students`}
        target="_blank"
        className="text-base text-purple-600 font-medium mx-auto italic"
        download
      >
        Descargar plantilla
      </Link>
    </div>
  );
}
