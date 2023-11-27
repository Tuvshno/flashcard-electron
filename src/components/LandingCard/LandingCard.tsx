import './LandingCard.css';

interface LandingCardProps {
  title?: string;
  description?: string;
  overlayColor?: string;
}

function LandingCard({ title, description, overlayColor }: LandingCardProps) {

  const overlayStyle = {
    '--overlay-color': overlayColor || 'rgba(0, 0, 0, 0.5)', // Default color
  } as React.CSSProperties;;
  
  return (
    <>
      <div className="flexBox">
        <div className="cardContainer" style={overlayStyle}>
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8dc9ae03-ba0d-48d9-932d-74f2c446f628?apiKey=adf3a83cd8e145eb92a1fcd80914fabe&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8dc9ae03-ba0d-48d9-932d-74f2c446f628?apiKey=adf3a83cd8e145eb92a1fcd80914fabe&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8dc9ae03-ba0d-48d9-932d-74f2c446f628?apiKey=adf3a83cd8e145eb92a1fcd80914fabe&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8dc9ae03-ba0d-48d9-932d-74f2c446f628?apiKey=adf3a83cd8e145eb92a1fcd80914fabe&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8dc9ae03-ba0d-48d9-932d-74f2c446f628?apiKey=adf3a83cd8e145eb92a1fcd80914fabe&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8dc9ae03-ba0d-48d9-932d-74f2c446f628?apiKey=adf3a83cd8e145eb92a1fcd80914fabe&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8dc9ae03-ba0d-48d9-932d-74f2c446f628?apiKey=adf3a83cd8e145eb92a1fcd80914fabe&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8dc9ae03-ba0d-48d9-932d-74f2c446f628?apiKey=adf3a83cd8e145eb92a1fcd80914fabe&"
            className="responsiveImage"
          />
          <div className="cardContent">
            <div className="cardTitle">{title}</div>
            <div className="cardDescription">{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingCard;
