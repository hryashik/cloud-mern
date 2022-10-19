import { RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const Main: React.FC = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuth)
	if (!isAuth) {
		return <Navigate to="/auth" />
	}
	return (
		<div>
			<h1>
				main!
			</h1>
		</div>
	)
}