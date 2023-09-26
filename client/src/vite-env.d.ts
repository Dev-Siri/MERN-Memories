/// <reference types="vite/client" />

module "react-file-base64" {
  interface Base64File {
    base64: string;
    file: File;
    name: string;
    size: string;
    type: string;
  }

  function FileBase64({
    onDone,
    multiple = false,
  }: {
    onDone: (file: Base64File) => void;
    multiple?: boolean;
  }): JSX.Element;

  export default FileBase64;
}
