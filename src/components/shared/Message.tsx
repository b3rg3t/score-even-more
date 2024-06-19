interface IMessage {
  text: string;
}

export const Message = ({ text }: IMessage) => (
  <div className="d-flex bg-danger rounded py-1 px-2 text-white mt-2">
    <p>{text}</p>
  </div>
);
