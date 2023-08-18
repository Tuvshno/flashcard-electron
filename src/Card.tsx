
type CardProps = {
  term: string,
  definition: string
}

function Card({ term, definition }: CardProps): JSX.Element {

  return (
    <>
      <div className='card-container'>
        <div> {term} </div>
        <div> {definition} </div>
      </div>

    </>
  )
}

export default Card