<template>
  <div class="nfc-scanner">
    <div class="scanner-status">
      <h2>NFC Tag Scanner</h2>
      <p v-if="!isSupported" class="error-message">
        NFC is not supported on this device or browser
      </p>
      <p v-else-if="!isScanning" class="info-message">
        Click the button below to start scanning
      </p>
      <p v-else class="scanning-message">
        Scanning for NFC tags...
      </p>
    </div>

    <div class="scanner-controls">
      <button
        v-if="isSupported"
        @click="toggleScanning"
        :class="['scan-button', isScanning ? 'scanning' : '']"
      >
        {{ isScanning ? 'Stop Scanning' : 'Start Scanning' }}
      </button>
    </div>

    <div v-if="lastReadTag" class="tag-info">
      <h3>Last Read Tag:</h3>
      <div class="tag-details">
        <p><span>ID:</span> {{ lastReadTag.id }}</p>
        <p><span>Content:</span> {{ lastReadTag.content }}</p>
        <p><span>Type:</span> {{ lastReadTag.type }}</p>
        <p><span>Time:</span> {{ formatTimestamp(lastReadTag.timestamp) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { nfcService, type NFCReadResult } from '../services/nfc'

const isSupported = nfcService.isSupported
const isScanning = ref(false)
const lastReadTag = ref<NFCReadResult | null>(null)

const toggleScanning = async () => {
  try {
    if (isScanning.value) {
      nfcService.stopScanning()
      isScanning.value = false
    } else {
      await nfcService.startScanning()
      isScanning.value = true
    }
  } catch (error) {
    console.error('Error toggling NFC scan:', error)
    isScanning.value = false
  }
}

const handleTagRead = (result: NFCReadResult) => {
  lastReadTag.value = result
}

nfcService.onTagRead(handleTagRead)

const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString()
}

onUnmounted(() => {
  if (isScanning.value) {
    nfcService.stopScanning()
  }
})
</script>

<style lang="scss" scoped>
.nfc-scanner {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
    text-align: center;
  }

  .scanner-status {
    text-align: center;
    margin-bottom: 24px;

    p {
      margin: 8px 0;
      
      &.error-message {
        color: #dc2626;
      }

      &.info-message {
        color: #4b5563;
      }

      &.scanning-message {
        color: #2563eb;
        animation: pulse 2s infinite;
      }
    }
  }

  .scanner-controls {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;

    .scan-button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 500;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      background-color: #2563eb;
      color: white;

      &:hover {
        background-color: #1d4ed8;
      }

      &.scanning {
        background-color: #4b5563;

        &:hover {
          background-color: #374151;
        }
      }
    }
  }

  .tag-info {
    border-top: 1px solid #e5e7eb;
    padding-top: 16px;

    h3 {
      font-size: 18px;
      margin-bottom: 12px;
    }

    .tag-details {
      p {
        margin: 8px 0;
        font-size: 14px;

        span {
          font-weight: 500;
          margin-right: 8px;
        }
      }
    }
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style> 