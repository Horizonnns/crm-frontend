<template>
	<section>
		<div class="flex flex-col space-y-2">
			<div class="space-y-1">
				<p>Login</p>
				<input
					type="text"
					placeholder="Login"
					class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-0 focus:border-primary placeholder:text-sm"
				/>
			</div>

			<div class="space-y-1">
				<p>Password</p>

				<input
					type="password"
					placeholder="Password"
					class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-0 focus:border-primary placeholder:text-sm"
				/>
			</div>
		</div>

		<button
			class="w-full duration-300 hover:text-white hover:bg-primary border rounded-md px-5 py-2 mt-5"
		>
			Login
		</button>
	</section>
</template>
