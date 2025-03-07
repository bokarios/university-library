import config from '@/lib/config'
import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Text,
	Tailwind,
	Img,
} from '@react-email/components'

interface Props {
	fullName: string
	ticketID: string
}

const baseUrl = 'http://localhost:3000'

const OnBoarding = ({
	fullName = 'John Doe',
	ticketID = '88822',
}: Props) => {
	return (
		<Html>
			<Head />
			<Preview>Onboarding Welcome Email 🎉</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="bg-gray-600 border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Img
							src={`${baseUrl}/images/logo.png`}
							alt="Logo"
							className="mx-auto"
						/>
						<Heading className="text-white text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Welcome to BookWise!
						</Heading>
						<Text className="text-white text-[14px] leading-[24px]">
							Welcome {fullName}, we are excited to have you
							with us.
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#dfdfdf] text-[12px] leading-[24px]">
							This message was intended for{' '}
							<span className="text-white">{fullName}</span>
							. If you did not create this ticket, please
							ignore this email.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default OnBoarding
